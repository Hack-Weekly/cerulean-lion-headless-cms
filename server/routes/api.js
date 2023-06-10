const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const passport = require("passport");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  // Get the token from the request cookies
  const token = req.session.cookies.token;

  // Verify the token
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Token is valid, set the user object in the request
    req.user = decoded;
    next();
  });
};

authRouter.post("/register", (req, res) => {
  const { username, password } = req.body;

  User.create({ username, password })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Duplicate key error (username already exists)
        res.status(400).json({ error: "Username already exists" });
      } else {
        // Other validation errors or server errors
        res.status(500).send(err);
      }
    });
});

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = generateToken(req, res, user);

    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

authRouter.get("/logout", (req, res) => {
  res.logout();
  res.send("Logged out!");
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
}
const generateToken = (user, res) => {
  // Define the payload containing any user-specific data
  const payload = {
    userId: user._id,
    username: user.username,
  };

  const secretKey = process.env.JWT_KEY; // Retrieve secret key from environment variables

  // Generate the JWT token with the secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  // Set the token as a cookie in the response
  res.cookie("token", token, { maxAge: 3600000, httpOnly: true }); // Adjust the maxAge and options as per your requirements

  return token;
};

router.post("/posts", authenticateToken, (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  post.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send("Post created Successfully");
    }
  });
});

router.get("/posts", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(posts);
    }
  });
});

router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id, (err, post) => {
    if (err) {
      res.status(500).send(err);
    } else if (!post) {
      res.status(404).send("Post not found");
    } else {
      res.status(200).json(post);
    }
  });
});

router.put("/posts/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  Post.findByIdAndUpdate(id, { title, content }, { new: true }, (err, post) => {
    if (err) {
      res.status(500).send(err);
    } else if (!post) {
      res.status(404).send("Post Not Found");
    } else {
      res.send("Post updated Successfully!");
    }
  });
});

router.delete("/posts/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id, (err, post) => {
    if (err) {
      res.status(500).send(err);
    } else if (!post) {
      res.status(404).send("Post Not Found!");
    } else {
      res.status(200).send("Post Deleted Successfully!");
    }
  });
});

router.post("/posts/:id/comments", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  Post.findById(id, (err, post) => {
    if (err) {
      res.status(500).send(err);
    } else if (!post) {
      res.status(404).send("Post not found");
    } else {
      const comment = {
        content: content,
        user: req.user._id,
      };
      post.comments.push(comment);
      post.save((err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send("Comment added successfully");
        }
      });
    }
  });
});

router.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  Post.findById(id)
    .populate("comments.user", "username") // Populate the user field in comments with only the username
    .exec((err, post) => {
      if (err) {
        res.status(500).send(err);
      } else if (!post) {
        res.status(404).send("Post not found");
      } else {
        res.json(post.comments);
      }
    });
});

router.use("/auth", authRouter);

module.exports = router;
