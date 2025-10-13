// Enlazamos el servicio (capa) de favoritos
const favoriteService = require("../services/favoriteService");

const getAllFavorites = async (req, res) => {
    try {
        const allFavorites = await favoriteService.getAllFavorites({ includeUser: true, includeCall: true });
        if (!allFavorites || allFavorites.length === 0) {
            return res.status(404).json({
                status: "Error",
                message: "No se encontraron favoritos"
            });
        }
        res.status(200).json({ status: "Ok", data: allFavorites });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const getFavoriteById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const favorite = await favoriteService.getFavoriteById(id, { includeUser: true, includeCall: true });
        if (!favorite) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el favorito con ID ${id}`
            });
        }
        res.status(200).json({ status: "Ok", data: favorite });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

// ============================================================
// 🔹 Obtener favoritos por usuario
// ============================================================
const getFavoritesByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
      return res.status(400).json({
        status: "Error",
        message: "El userId debe ser un número válido",
      });
    }

    const userFavorites = await favoriteService.getFavoritesByUser(userId, {
      includeUser: true,
      includeCall: true,
    });

    if (!userFavorites || userFavorites.length === 0) {
      return res.status(404).json({
        status: "Error",
        message: `No se encontraron favoritos para el usuario con ID ${userId}`,
      });
    }

    res.status(200).json({
      status: "Ok",
      data: userFavorites,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};


const createFavorite = async (req, res) => {
    try {
        const { userId, callId } = req.body;

        if (!userId || !callId) {
            return res.status(400).json({
                status: "Error",
                message: "Faltan campos obligatorios: userId, callId"
            });
        }

        const newFavorite = await favoriteService.createFavorite({ userId, callId });
        res.status(201).json({ status: "Ok", data: newFavorite });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const updateFavorite = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const { userId, callId } = req.body;
        const updatedFavorite = await favoriteService.updateFavorite(id, { userId, callId });
        if (!updatedFavorite) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el favorito con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", data: updatedFavorite });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({
                status: "Error",
                message: "El ID debe ser un número válido"
            });
        }

        const deletedFavorite = await favoriteService.deleteFavorite(id);
        if (!deletedFavorite) {
            return res.status(404).json({
                status: "Error",
                message: `No se encontró el favorito con ID ${id}`
            });
        }

        res.status(200).json({ status: "Ok", message: "Favorito eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllFavorites,
     getFavoritesByUser, // ✅ nuevo
    getFavoriteById,
    createFavorite,
    updateFavorite,
    deleteFavorite,
};
