const viewPath = 'resources';
const Resource = require('../models/resource');
const User = require('../models/user');

exports.index = async (req, res) => {
  try {
    const resources = await Resource
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.status(200).json(resources);
  } catch (error) {
    res.status(400).json({message: 'There was an error fetching the stories', error});
  }
};

exports.show = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('user');
    
    res.status(200).json(resource);
  } catch (error) {
    res.status(400).json({message: "There was an error fetching the story"});
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Story'
  });
};

exports.create = async (req, res) => {
  console.log(req.body);
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    
    const resource = await Resource.create({user: user._id, ...req.body});

    res.status(200).json(resource);
  } catch (error) {
    res.status(400).json({message: "There was an error creating the story", error});
  }
};

exports.edit = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: resource.title,
      formData: resource
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this story: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let resource = await Resource.findById(req.body.id);
    if (!resource) throw new Error('Story could not be found');

    const attributes = {user: user._id, ...req.body};
    await Resource.validate(attributes);
    await Resource.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The story was updated successfully');
    res.redirect(`/resources/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this story: ${error}`);
    res.redirect(`/resources/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    await Resource.deleteOne({_id: req.body.id});
    res.status(200).json({message: "Yay."});
  } catch (error) {
    res.status(400).jason({message: "There was an error deleting the story"});
  }
};