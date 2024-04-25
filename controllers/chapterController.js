module.exports.addChapter = async (req, res) => {
  const { Chapters, Books } = req.db;
  const { key } = req;
  if (key != process.env.API_KEY) {
    res.status(403).json({ msg: "Api token required" });
  } else {
    if (
      !req.body.title ||
      !req.body.bookId ||
      (!req.body.title && !req.body.bookId)
    ) {
      res.status(400).json({ msg: "title and id parameters required" });
    } else {
      const { title, bookId } = req.body;
      const book = Books.findOne({
        id: bookId,
      });

      if (book == null) {
        res.json({ msg: "book not found" });
      } else {
        Chapters.create({
          title: title,
          bookId: bookId,
        });

        const chapters = await Chapters.findAll();
        res.status(201).json({ msg: "created", _data: chapters });
      }
    }
  }
};
module.exports.deleteChapter = async () => {
  const { Chapters } = req.db;
  const { key } = req;
  if (!req.param.id) {
    res.json({ msg: "chapter id required" });
  } else {
    const { id } = req.param;
    if (key != process.env.API_KEY) {
      res.status(403).json({ msg: "Api token required" });
    } else {
      const chapterId = Chapters.findOne({
        where: {
          id: id,
        },
      });

      if (chapterId == null) {
        res.json({ msg: "chapter not found" });
      } else {
        chapterId.destroy();
        const chapters = Chapters.findAll();
        res.status(200).json({
          msg: "deleted",
          _data: chapters.filter((Data) => Data.id != id),
        });
      }
    }
  }
};
module.exports.updateChapter = async (req, res) => {
  const { Chapters } = req.db;
  const { key } = req;
  if (!req.param.id || !req.body.title || (!req.param.id && !req.body.title)) {
    res.json({ msg: "chapter id required" });
  } else {
    const { id } = req.param;
    if (key != process.env.API_KEY) {
      res.status(403).json({ msg: "Api token required" });
    } else {
      const chapterId = Chapters.findOne({
        where: {
          id: id,
        },
      });
      if (chapterId == null) {
        res.json({ msg: "chapter not found" });
      } else {
        Chapters.updateChapter({ title: title });
        const chapters = Chapters.findAll();
        res.status(200).json({
          msg: "updated",
          _data: chapters.filter((data) => {
            if (data.id == id) data.title = title;
            return data;
          }),
        });
      }
    }
  }
};
module.exports.listChapters = async (req, res) => {
  const { Chapters,Verses } = req.db;
  const { key } = req;
  if (key != process.env.API_KEY) {
    res.status(403).json({ msg: "Api token required" });
  } else {
    const chapters = await Chapters.findAll({ include:[Verses]});
    res.json({ _data: chapters });
  }
};
module.exports.chapterById = async (req, res, next, id) => {
  const { key } = req;
  const { Chapters ,Verses} = req.db;
  if (key != process.env.API_KEY) {
    res.status(403).json({ msg: "Api token required" });
  } else {
    const chapter = await Chapters.findOne({
      where: { id: id, bookId: req.books.id },
      include:[Verses]
    });
    req.chapter = chapter;
    next();
  }
};
module.exports.chapterBYIDLIST = async (req, res) => {
  const { key } = req;
  if (key != process.env.API_KEY) {
    res.status(403).json({ msg: "Api token required" });
  } else {
    if (req.books == null) {
      res.send("book not found");
    }
    if (req.chapter == null) {
      res.send("chapter not found");
    } else {
      const { chapter } = req;

        res.json({ _data: chapter });
      }
  }
};
