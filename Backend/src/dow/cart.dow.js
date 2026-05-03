import cartModel from "../models/cart.model.js"
import mongoose from 'mongoose'



export async function getCartDetail(userId){
     let cart=(await cartModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId)
      }
    },
    { $unwind: { path: '$items' } },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'items.product'
      }
    },
    { $unwind: { path: '$items.product' } },
    {
      $addFields: {
        'items.product.varients': {
          $filter: {
            input: { $ifNull: ['$items.product.varients', []] },
            as: 'v',
            cond: { $eq: ['$$v._id', '$items.varient'] }
          }
        }
      }
    },
    {
      $addFields: {
        itemPrice: {
          price: {
            $multiply: [
              '$items.quantity',
              {
                $cond: {
                  if: { $gt: [{ $size: '$items.product.varients' }, 0] },
                  then: { $arrayElemAt: ['$items.product.varients.price.amount', 0] },
                  else: { $ifNull: ['$items.product.price.amount', 0] }
                }
              }
            ]
          },
          currency: {
            $cond: {
              if: { $gt: [{ $size: '$items.product.varients' }, 0] },
              then: { $arrayElemAt: ['$items.product.varients.price.currency', 0] },
              else: { $ifNull: ['$items.product.price.currency', 'INR'] }
            }
          }
        }
      }
    },
    {
      $group: {
        _id: '$_id',
        totalPrice: { $sum: '$itemPrice.price' },
        currency: {
          $first: '$itemPrice.currency'
        },
        items: { $push: '$items' }
      }
    }
    ]))[0]

    return cart
}