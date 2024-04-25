module.exports.addVerse = async (req, res) => {
  const { Books, Verses, Chapters } = req.db;
  const { key } = req;
  if (
    !req.body.content ||
    !req.body.bookId ||
    !req.body.chapterId ||
    (!req.body.content && !req.body.bookId) ||
    !req.body.chapterId
  ) {
    res
      .status(400)
      .json("content, chapter id and book id parameters not provided");
  } else {
    if (key != process.env.API_KEY) {
      res.status(403).json({ msg: "Api token required" });
    } else {
      const { bookId, chapterId, content } = req.body;
      const book = Books.findOne({ where: { id: bookId } });
      const chapter = Chapters.findOne({ where: { id: chapterId } });

      if (book != null && chapter != null) {
        Verses.create({
          bookId: bookId,
          chapterId: chapterId,
          content: content,
          title: req.body.title || "none",
        });

        const verses = await Verses.findAll();
        res.status(201).json({ msg: "created", _data: verses });
      } else {
        res.json({ msg: "invalid chapter and book " });
      }
    }
  }
};
module.exports.deleteVerse = async () => {
  const { Verses } = req.db;
  const { key } = req;
  if (key != process.env.API_KEY) {
    res.status(403).json({ msg: "Api token required" });
  } else {
    if (!req.body.vID) {
      res.status(400).json({ msg: "invalid verse id" });
    }
    const { vID } = req.body;
    const verse = Verses.findOne({
      where: { id: vID },
    });

    if (verse == null) {
      res.json({ msg: "verse not found" });
    } else {
      verse.destroy();
      const verses = Verses.findAll();
      res.json({
        msg: "deleted",
        _data: verses.filter((dat) => dat.id != vID),
      });
    }
  }
};
module.exports.updateVerse = async (req,res) => {
    const { Verses } = req.db;
    const { key } = req;
    if (!req.param.id || !req.body.content || (!req.param.id && !req.body.content)) {
      res.json({ msg: "verse id required" });
    } else {
      const { id } = req.param;
      if (key != process.env.API_KEY) {
        res.status(403).json({ msg: "Api token required" });
      } else {
        const verseId = Verses.findOne({
          where: {
            id: id,
          },
        });
        if (verseId == null) {
          res.json({ msg: "verse not found" });
        } else {
          Verses.update({ content: content,  title: req.body.title || "none"});
          const verses = Verses.findAll();
          res.status(200).json({
            msg: "updated",
            _data: verses.filter((data) => {
              if (data.id == id) data.content = content;
              return data;
            }),
          });
        }
      }
    }
};
module.exports.verseById = async (req,res,next,id) => {
    const { key } = req;
    const { Verses } = req.db;
    if (key != process.env.API_KEY) {
      res.status(403).json({ msg: "Api token required" });
    } else {
      const verses = await Verses.findOne({
        where: { id: id, bookId: req.books.id ,chapterId:req.chapter.id},
      });
      req.chapter = chapter;
      next();
    }
};
module.exports.listVerses = async (req, res) => {
  const { Verses } = req.db;
  const verses = await Verses.findAll();
  const { key } = req;

  if (key == process.env.API_KEY) {
    if (verses == null) {
      res.json({ msg: "empty verse" });
    } else {
      res.json({ _data: verses });
    }
  } else {
    res.status(403).json({ msg: "Api token required" });
  }
};
module.exports.verseBYIDLIST = async () => {
  const { key } = req;
  if (key != process.env.API_KEY) {
    res.status(403).json({ msg: "Api token required" });
  } else {
    if (req.books == null) {
      res.send("book not found");
    }
    if (req.chapter == null) {
      res.send("chapter not found");
    }
    if (req.verse == null) {
        res.send("verse not found");
    } else {
      res.json({ _data: req.verse });
    }
  }
};
