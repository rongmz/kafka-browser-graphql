const kafka = require('./kafka');
const kafkaAdmin = kafka.admin()

module.exports = {

  /**
   * List all topics from kafka
   * @param {search:String} param0
   */
  listTopics: async ({ search }) => {
    const list = await kafkaAdmin.listTopics();
    if (!!search) {
      const reg = new RegExp(search, 'ig');
      return list.filter(name => reg.test(name));
    }
    else return list;
  },


  /**
   * Get the metadata for the given topics list
   * @param {topics:String[]} param0
   */
  getTopicMetadata: async ({ topics }) => {
    return kafkaAdmin.fetchTopicMetadata({ topics })
      .then(({ topics }) => topics)
  },

}
