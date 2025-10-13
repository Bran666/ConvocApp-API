const { Favorite, User, Call } = require("../models");

const getAllFavorites = async ({ includeUser = false, includeCall = false } = {}) => {
    const options = {};
    const includes = [];

    if (includeUser) {
        includes.push({
            model: User,
            as: 'user'
        });
    }

    if (includeCall) {
        includes.push({
            model: Call,
            as: 'call'
        });
    }

    if (includes.length > 0) {
        options.include = includes;
    }

    return Favorite.findAll(options);
};

// ============================================================
// 🔹 Obtener favoritos por usuario
// ============================================================
const getFavoritesByUser = async (userId, options = {}) => {
  const { includeUser = false, includeCall = false } = options;
  const include = [];
  if (includeUser) include.push({ model: User, as: "user" });
  if (includeCall) include.push({ model: Call, as: "call" });

  return await Favorite.findAll({
    where: { userId },
    include,
  });
};

const getFavoriteById = async (id, { includeUser = false, includeCall = false } = {}) => {
    const options = { where: { id } };
    const includes = [];

    if (includeUser) {
        includes.push({
            model: User,
            as: 'user'
        });
    }

    if (includeCall) {
        includes.push({
            model: Call,
            as: 'call'
        });
    }

    if (includes.length > 0) {
        options.include = includes;
    }

    return Favorite.findOne(options);
};

const createFavorite = async (data) => {
    return Favorite.create(data);
};

const updateFavorite = async (id, data) => {
    const [updated] = await Favorite.update(data, { where: { id } });
    if (!updated) return null;
    return Favorite.findByPk(id);
};

const deleteFavorite = async (id) => {
    const deleted = await Favorite.destroy({ where: { id } });
    return deleted > 0;
};

module.exports = {
    getAllFavorites,
     getFavoritesByUser, // ✅ nuevo
    getFavoriteById,
    createFavorite,
    updateFavorite,
    deleteFavorite
};
