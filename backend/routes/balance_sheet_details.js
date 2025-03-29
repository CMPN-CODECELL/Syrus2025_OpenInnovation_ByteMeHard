const express = require("express");
const BalanceRouter = express.Router();
const mongoose = require('mongoose');
const balance_sheet = require("../models/balance_sheet");

BalanceRouter.get("/total-profit", async function(req, res) {
    try {
        const result = await balance_sheet.aggregate([
            {
                $group: {
                    _id: null, 
                    totalProfit: { $sum: "$total_price" } 
                }
            }
        ]);

        res.status(200).json({ totalProfit: result[0]?.totalProfit || 0 });
    } catch (error) {
        console.error("Error calculating profit:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



BalanceRouter.get("/top-five-buyers", async (req,res) => {
  try {
    const topBuyers = await Transaction_between_retailer_buyer.aggregate([
      {
        $group: {
          _id: "$buyer", 
          totalTransactions: { $sum: 1 }, 
        },
      },
      {
        $sort: { totalTransactions: -1 }, 
      },
      {
        $limit: 5, 
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "buyerDetails",
        },
      },
      {
        $unwind: "$buyerDetails", 
      },
      {
        $project: {
          _id: 0,
          buyerId: "$buyerDetails._id",
          name: "$buyerDetails.name",
          email: "$buyerDetails.email",
          totalTransactions: 1,
        },
      },
    ]);
    console.log("Top 5 Buyers:", topBuyers);
  } catch (error) {
    console.error("Error fetching top buyers:", error);
  }
});




module.exports = BalanceRouter;
