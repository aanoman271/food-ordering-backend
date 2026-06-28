import Food from "../models/Food.js";

// get all food
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.status(200).json(foods);
  } catch (error) {
    console.error("Get Foods Error:", error.message);
    res.status(500).json({ message: "Server Error, could not fetch foods" });
  }
};

//   Create a new food item (Admin Only)
//   POST /api/foods

export const createFood = async (req, res) => {
  try {
    const { name, category, price, image, description } = req.body;

    if (!name || !category || !price || !image) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newFood = await Food.create({
      name,
      category,
      price,
      image,
      description,
    });

    res.status(201).json({
      message: "Food item added successfully",
      food: newFood,
    });
  } catch (error) {
    console.error("Create Food Error:", error.message);
    res.status(500).json({ message: "Server Error, could not add food" });
  }
};

//   DELETE /api/foods/:id
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    await food.deleteOne();
    res.status(200).json({ message: "Food item removed successfully" });
  } catch (error) {
    console.error("Delete Food Error:", error.message);
    res.status(500).json({ message: "Server Error, could not delete food" });
  }
};
