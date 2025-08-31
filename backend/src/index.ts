import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { Schema, Document } from "mongoose";
import { log } from "console";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(
  cors({
    origin: "type-fast-puce.vercel.app", // frontend port
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Mongoose schema & model
interface ArticleEntry {
  id: number;
  article: string;
}

// export interface ArticleData extends Document {
//   data: Map<string, ArticleEntry[]>;
// }

const ArticleEntrySchema = new Schema({
  id: { type: Number, required: true },
  article: { type: String },
});

const ArticleSchema = new Schema({
  "03 - 08 lines": [ArticleEntrySchema],
  "08 - 12 lines": [ArticleEntrySchema],
  "18 - 22 lines": [ArticleEntrySchema],
  "28 - 32 lines": [ArticleEntrySchema],
  "38 - 42 lines": [ArticleEntrySchema],
  "48 - 52 lines": [ArticleEntrySchema],
  "58 - 62 lines": [ArticleEntrySchema],
  "68 - 72 lines": [ArticleEntrySchema],
  "78 - 82 lines": [ArticleEntrySchema],
  "88 - 92 lines": [ArticleEntrySchema],
  "above 92 lines": [ArticleEntrySchema],
  "a-z": [ArticleEntrySchema],
  "5 - 15 words": [ArticleEntrySchema],
  "20 - 30 words": [ArticleEntrySchema],
  "45 - 55 words": [ArticleEntrySchema],
  "70 - 80 words": [ArticleEntrySchema],
  "above 90 words": [ArticleEntrySchema],
  code: [ArticleEntrySchema],
});
// const ArticleSchema = new Schema<ArticleData>({
//   data: {
//     type: Map,
//     of: [ArticleEntrySchema],
//     required: true,
//   },
// });

const Article = mongoose.model("articles", ArticleSchema);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

interface ScoreEntry {
  name: string;
  bestTime: string;
}

interface ScoresDocument extends Document {
  category: string;
  scores: ScoreEntry[];
}

const scoresSchema = new mongoose.Schema<ScoresDocument>({
  category: { type: String, required: true },
  scores: [
    {
      name: { type: String, required: true },
      bestTime: { type: String, required: true },
    },
  ],
});

const Scores = mongoose.model<ScoresDocument>("Scores", scoresSchema);

let topScores: any = 0;

// const x = async () => {
//   const ids = await Article.find({ data: "10 words" });
//   console.log(ids);
// };

// if (x) {
//   console.log(x);
// }

// Corrected route with proper return typing
app.post(
  "/handle_request",
  async (req: Request, res: Response): Promise<void> => {
    type MessageType = string | { id: number; key: string };

    const { message } = req.body as { message: MessageType };
    console.log(message);

    if (!message) {
      res.status(400).json({ error: "Missing message field" });
      return;
    }

    try {
      type ArticleKey = "a-z";
      type MessageType = string | { id: number; key: string };
      const { message } = req.body as { message: MessageType };

      if (typeof message === "string") {
        if (message === "A-Z") {
          const msg = message.toLocaleLowerCase() as ArticleKey;
          const data = await Article.findOne({}, { [msg]: 1, _id: 0 });

          if (!data || !Array.isArray(data[msg])) {
            console.error("IDs are missing or not an array.");
            return;
          }

          res.json({ data: data[msg][0] });
        } else {
          let newMessage = message.toLowerCase();
          const data = await Article.findOne(
            {},
            { [`${newMessage.toLowerCase()}.id`]: 1, _id: 0 }
          );
          console.log(data);
          console.log(newMessage);

          // const key = data.get(newMessage);

          if (!data || !Array.isArray((data as any)[newMessage])) {
            console.error("IDs are missing or not an array.");
            return;
          }

          const key = newMessage as keyof typeof data;
          console.log(key);

          const ids = data[key].length;
          console.log(data[key].length);

          const items = data[key]; // array of objects with 'id'
          const randomItem = items[Math.floor(Math.random() * items.length)];
          const randomIndex = randomItem.id;
          // const randomId = ids[randomIndex];
          console.log(randomIndex);

          const query = `${key}.id`;

          const article = await Article.findOne(
            { [`${key}`]: { $elemMatch: { id: randomIndex } } },
            { [`${key}.$`]: 1, _id: 0 } // ✅ projection with positional operator
          );
          res.json({ data: article?.[key][0] });
          console.log(article?.[key][0]);
          console.log(article);
        }
      } else {
        console.log("running else");

        // const key = message as keyof typeof data;
        const id = message.id;
        const key = message.key.toLocaleLowerCase();

        console.log(id);
        console.log("key :", message.key);

        const query = `${message}.id`;

        const article = await Article.findOne(
          { [`${key}`]: { $elemMatch: { id: id } } },
          { [`${key}.$`]: 1, _id: 0 } // ✅ projection with positional operator
        );
        console.log(article);
        console.log((article as any)?.[key][0]);

        res.json({ data: (article as any)?.[key][0] });
      }

      // if (!data || !Array.isArray(data[msg])) {
      //   console.error("IDs are missing or not an array.");
      //   return;
      // }

      // res.json({ data: data[msg][0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// app.post(
//   "/handle_login",
//   async (req: Request, res: Response): Promise<void> => {
//     const username = req.cookies.username;
//     if (username) {
//       res.json({ username });
//     }
//   }
// );

app.post(
  "/handle_username",
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.body);

    const { username } = req.body;
    if (username) {
      const exists = await User.findOne({ username });
      if (exists) {
        res.status(500).json("exists");
        console.log("exists");
      } else {
        await User.create({ username });
        res.send("username added successfully"); // Don't forget this
      }
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// import express, { Request, Response } from "express";
// import mongoose from "mongoose";
// import User from "./models/User"; // Assuming you have your User model exported

// const app = express();
// app.use(express.json());

// Helper to convert hh:mm:ss to total seconds
function timeStringToSeconds(timeStr: string): number {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

app.post(
  "/display_scores",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, category, time } = req.body;
      console.log("received from Client: ", time);

      if (!username || !category || typeof time !== "string") {
        res.status(400).json({ error: "Missing or invalid fields" });
        return;
      }

      // const incomingTimeSec = timeStringToSeconds(time);
      let existingCategory = await Scores.findOne({ category: category });
      const topscores = async () => {
        existingCategory = await Scores.findOne({ category: category });
        try {
          topScores = existingCategory
            ? await Scores.aggregate([
                { $match: { category: category } },
                { $unwind: "$scores" },
                {
                  $addFields: {
                    scoresSeconds: {
                      $let: {
                        vars: {
                          timeParts: { $split: ["$scores.bestTime", ":"] },
                        },
                        in: {
                          $add: [
                            {
                              $multiply: [
                                {
                                  $toInt: {
                                    $trim: {
                                      input: {
                                        $arrayElemAt: ["$$timeParts", 0],
                                      },
                                    },
                                  },
                                },
                                60,
                              ],
                            },
                            {
                              $toInt: {
                                $trim: {
                                  input: { $arrayElemAt: ["$$timeParts", 1] },
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                },
                { $sort: { scoresSeconds: 1 } },
                { $limit: 3 },
                {
                  $project: {
                    _id: 0,
                    name: "$scores.name",
                    bestTime: "$scores.bestTime",
                  },
                },
              ])
            : null;
        } catch (error) {
          console.log(error);
        }
      };

      if (!existingCategory) {
        // Create new user with initial score
        const scores = new Scores({
          category,
          scores: [{ name: username, bestTime: time }],
        });
        await scores.save();
        await topscores();
        res.status(200).json({
          message: "New user created with score",
          bestTime: time,
          topScores,
        });
        return;
      }

      const userExists = existingCategory.scores.find(
        (score) => score.name === username
      );

      if (!userExists) {
        existingCategory.scores.push({ name: username, bestTime: time });
        await existingCategory.save();
        await topscores();
        res.status(200).json({
          message: "User score added to existing category",
          bestTime: time,
          topScores,
        });
      } else {
        const sentTime = timeStringToSeconds(time);

        const storedTime = timeStringToSeconds(userExists.bestTime);
        const oldTime = userExists.bestTime;
        console.log(userExists.bestTime);

        console.log("sentTime : ", sentTime, " < storedTime :", storedTime);

        if (sentTime < storedTime) {
          userExists.bestTime = time;
          await existingCategory.save();
          await topscores();
          res.status(200).json({
            message: `new`,
            bestTime: time,
            prevTime: oldTime,
            topScores,
          });
        } else {
          await topscores();

          res.status(200).json({
            message: "New time is not better",
            bestTime: userExists.bestTime,
            topScores,
            // prevTime,
          });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
