const sdk = require("node-appwrite");

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const database = new sdk.Databases(client);
  
  const clipDatabase = req.variables['CLIP_DATABASE'];
  const clipsCollection = req.variables['CLIPS_COLLECTION'];

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.log("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
  }

  database.listDocuments(clipDatabase, clipsCollection).then((clips) => {
    let deletedClips = 0;
    Promise.all(clips.documents.map(async (clip) => {
      if (!clip || clip == undefined)
        return;
      switch (clip.lifetime) {
        case 'oneMinute': 
          if (Date.parse(clip.$createdAt) + 60000 > Date.now())
            return; else break;
        case 'tenMinutes': 
          if (Date.parse(clip.$createdAt) + 600000 > Date.now())
            return; else break;
        case 'oneHour':
          if (Date.parse(clip.$createdAt) + 3600000 > Date.now())
            return; else break;
        case 'oneDay':
          if (Date.parse(clip.$createdAt) + 86400000 > Date.now())
            return; else break;
      }
      await database.deleteDocument(clipDatabase, clipsCollection, clip.$id);
      deletedClips = deletedClips + 1;
    })).then(() => res.send(deletedClips + ' clips deleted'));
  }).catch((e) => {
    res.send(e.message);
  });
};
