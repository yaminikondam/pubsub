const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();
const getKeyFromRequestData = requestData => {
  return datastore.key([requestData.kind, requestData.key]);
};

exports.set = async (req, res) => {

  try {
    const key = await getKeyFromRequestData(req.body);
    const entity = {
      key: key,
      data: req.body.value,
    };

    await datastore.save(entity);
    res.status(200).send(`${key.path.join('/')} records inserted.`);
  } catch (err) {
    console.error(new Error(err.message)); 
    res.status(500).send(err.message);
  }
}

exports.get = async (req, res) => {
  try {
    const keys = await getKeyFromRequestData(req.body);
    const [entity] = await datastore.get(keys);
    
    if (!entity) {
      throw new Error(`Error while processing ${key.path.join('/')}.`);
    }
    res.status(200).send(`records processed :`, entity);
  } catch (err) {
    console.error(new Error(err.message)); 
    res.status(500).send(err.message);
  }
};
