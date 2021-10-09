const kafka = require('./kafka');
const kafkaAdmin = kafka.admin()

const ConfigResourceType = {
  UNKNOWN: 0,
  TOPIC: 2,
  BROKER: 4,
  BROKER_LOGGER: 8
}

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
    const result = await kafkaAdmin.fetchTopicMetadata({ topics })
    return result.topics
  },


  /**
   * Get Offsets for a particular topic
   * @param {*} param0
   * @returns
   */
  getTopicOffsets: async ({ topic, timestamp }) => {
    if (!!timestamp)
      return await kafkaAdmin.fetchTopicOffsetsByTimestamp(topic, timestamp)
    else
      return await kafkaAdmin.fetchTopicOffsets(topic)
  },


  /**
   * Get Offsets for a consumer group
   * @param {*} param0
   * @returns
   */
  getConsumerGroupOffsets: async ({ topic, groupId, resolveOffsets }) => {
    return await kafkaAdmin.fetchOffsets({ groupId, topic, resolveOffsets })
  },

  /**
   * Describe cluster
   * @param {*} param0
   * @returns
   */
  describeCluster: async () => await kafkaAdmin.describeCluster(),

  /**
   * Describe the config parameters for the given resource.
   * @param {*} param0
   */
  describeConfigs: async ({ includeSynonyms, resources }) => {
    const result = await kafkaAdmin.describeConfigs({
      includeSynonyms,
      resources: resources.map(r => ({
        type: ConfigResourceType[r.type],
        name: r.name,
        configNames: r.configNames,
      }))
    });
    return {
      ...result,
      resources: (result.resources || []).map(r => {
        r.resourceType = ConfigResourceType[r.resourceType]
        return r;
      })
    }
  },


  /**
   * List all groups available to kafka broker
   * @param {*} param0
   */
  listGroups: async () => {
    const result = await kafkaAdmin.listGroups()
    return result.groups
  },


  /**
   * Describe the given groups
   * @param {*} param0
   * @returns
   */
  describeGroups: async ({ groupIds }) => {
    const result = await kafkaAdmin.describeGroups(groupIds)
    return result.groups
  },

  /**
   * Delete topics
   * @param {*} param0
   * @returns
   */
  deleteTopics: async ({ topics, timeout }) => {
    await kafkaAdmin.deleteTopics({ topics, timeout })
    return true;
  },

  /**
   * Create topics
   * @param {*} param0
   */
  createTopics: async ({ validateOnly, waitForLeaders, timeout, topics }) => {
    return await kafkaAdmin.createTopics({ validateOnly, waitForLeaders, timeout, topics })
  },

  /**
   * Create partition for topics
   * @param {*} param0
   * @returns
   */
  createPartitions: async ({ validateOnly, timeout, topicPartitions }) => {
    await kafkaAdmin.createPartitions({ validateOnly, timeout, topicPartitions })
    return true
  },

  /**
   * Reset offsets for consumer groups
   * @param {*} param0
   * @returns
   */
  resetConsumerGroupOffsets: async ({ groupId, topic, earliest }) => {
    await kafkaAdmin.resetOffsets({ groupId, topic, earliest })
    return true
  },

  /**
   * Reset offsets for consumer groups by timestamp
   * @param {*} param0
   * @returns
   */
  resetConsumerGroupOffsetsByTimestamp: async ({ groupId, topic, timestamp }) => {
    await kafkaAdmin.setOffsets({
      groupId, topic,
      partitions: await kafkaAdmin.fetchTopicOffsetsByTimestamp(topic, timestamp)
    })
    return true
  },

  /**
   * Set offsets for consumer groups
   * @param {*} param0
   * @returns
   */
  setConsumerGroupOffsets: async ({ groupId, topic, partitions }) => {
    await kafkaAdmin.setOffsets({ groupId, topic, partitions })
    return true
  },

  /**
   * Alter resource configurations
   * @param {*} param0
   * @returns
   */
  alterConfigs: async ({ validateOnly, resources }) => {
    const result = await kafkaAdmin.alterConfigs({
      validateOnly,
      resources: resources.map(r => ({
        type: ConfigResourceType[r.type],
        name: r.name,
        configEntries: r.configEntries,
      }))
    })
    return {
      ...result,
      resources: (result.resources || []).map(r => {
        r.resourceType = ConfigResourceType[r.resourceType]
        return r;
      })
    }
  },

  /**
   * Delete groups by group id
   * @param {*} param0
   */
  deleteGroups: async ({ groupIds }) => {
    return (await kafkaAdmin.deleteGroups(groupIds))
      .map(r => ({
        ...r,
        error: r.error?.stack
      }))
  },

  deleteTopicRecords: async ({topic, partitions}) => {
    await kafkaAdmin.deleteTopicRecords({topic, partitions})
    return true
  }

}

