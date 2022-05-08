import moviesModel from "../Models/moviesModel.js";


//#region createMovies
export const createMovies = async (req, res) => {
    try {
        let adminId = req.params.adminId;
        let adminIdFromToken = req.adminId
        if (adminId !== adminIdFromToken) {
            return res.status(401).send({ message: `unauthorized access! Admin info doesn't match` });
        }
        const movies = await moviesModel.create(req.body);
        res.status(201).send(movies);
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

//#endregion




//#region showSeats
export const showSeats = async (req, res) => {
    try {
        const queryParams = req.query;
        const { movieName } = queryParams;

        if (movieName) {

            const movies = await moviesModel.find({ movieName }).select({ movieName: 1, showTime: 1, duration: 1, availableRegularSeats: 1, availablePremiumSeats: 1, _id: 0 });

            return res.status(200).send({ status: true, data: movies })
         
        }

        return res.status(404).send({ status: false, message: "No movies found " });

    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

//#endregion




//#region seatBooking
export const seatBooking = async (req, res) => {
    try {
        const requestBody = req.body;
        const { movieName, regularSeats, premiumSeats } = requestBody;
        const movies = await moviesModel.find({ movieName });
    
        if (movies.length > 0) {
            const movie = movies[0];
            const availableRegularSeats = movie.availableRegularSeats;
            const regularPrice = movie.regularPrice;
            const availablePremiumSeats = movie.availablePremiumSeats;
            const premiumPrice = movie.premiumPrice;

            if (availableRegularSeats >= regularSeats && availablePremiumSeats >= premiumSeats) {
                const newAvailableRegularSeats = availableRegularSeats - regularSeats;
              
                const totalPriceForRegularSeats = regularSeats * regularPrice;
            
                const newAvailablePremiumSeats = availablePremiumSeats - premiumSeats;

                const totalPriceForPremiumSeats = premiumSeats * premiumPrice;
         
                const totalPrice = totalPriceForRegularSeats + totalPriceForPremiumSeats;
           
                const updatedMovie = await moviesModel.findOneAndUpdate({ movieName, totalPrice: totalPrice }, { availableRegularSeats: newAvailableRegularSeats, availablePremiumSeats: newAvailablePremiumSeats }, { new: true }).select({ _id: 0, movieName: 1, theatreId: 1, showTime: 1, duration: 1 });

                if (regularSeats === 0 && premiumSeats === 0) {
                    return res.status(400).send({ status: true, message: "Housefull No seats available" });
                }
                return res.status(200).send({ status: true, message: "Seats booked successfully", data: updatedMovie, totalPrice });
            } else {
                return res.status(200).send({ status: false, message: "Seats not available" });
            }
        } else {
            return res.status(200).send({ status: false, message: "No movies found" });
        }
    } catch (error) {
        return res.status(500).send({
            message: error.message
        });
    }
}

//#endregion
