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
  const token = req.cookies.token;

  // Verify the token
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid authentication token' });
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
  const post = new Post({ title, content, user: req.user._id });
  post.save({})
    .then((post) => {
      res.status(200).json("Post created Successfully");
    })
    .catch((err) => {
      console.error('Error getting posts:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get("/posts", (req, res) => {
  Post.find({})
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.error('Error getting posts:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get("/:user/posts", (req, res) => {
  const { user } = req.params;
  Post.findByUsername(user)
  .then(posts => {
    if (!posts) {
      res.status(404).send("Post not found");
    } else {
      res.status(200).json(posts);
    }
  })
  .catch(err => {
    console.error('Error getting post:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  });
});

router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  Post.findById(id, {})
    .then(post => {
      if (!post) {
        res.status(404).send("Post not found");
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      console.error('Error getting post:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.put("/posts/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  Post.findByIdAndUpdate(id, {title, content, user: req.user._id})
  .then(post => {
    if (!post) {
      res.status(404).send("Post Not Found");
    } else {
      res.status(200).send("Post updated Successfully!");
    }
  })
  .catch(err => {
    console.error('Error updating post:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  });
});

router.delete("/posts/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id, {}).then(post => {
    if (!post) {
      res.status(404).send("Post Not Found!");
    } else {
      res.status(200).send("Post Deleted Successfully!");
    }
  })
  .catch(err => {
    console.error('Error deleting post:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  });
});

router.post("/posts/:id/comments", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  Post.findById(id, {}).then(post => {
    if (!post) {
      res.status(404).send("Post not found");
    } else {
      const comment = {
        content: content,
        user: req.user.username,
      };
      post.comments.push(comment);
      post.save({})
      .then(postComment => {
        res.status(200).send("Comment added successfully");
      })
      .catch(err => {
        res.status(500).send(err);
      });
    }
  })
  .catch(err => {
    console.error('Error posting comment:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  });
});

router.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  Post.findById(id)
    //.populate("comments.user", "username") // Populate the user field in comments with only the username
    .then(post => {
      if (!post) {
        res.status(404).send("Post not found");
      } else {
        res.json(post.comments);
      }
    })
    .catch(err => {
      console.error('Error getting comments:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.use("/auth", authRouter);

module.exports = router;
