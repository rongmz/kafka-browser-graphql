# kafka-browser-graphql

This is a graphql server to connect to any kafka cluster and export a graphql api out of it. Very useful for developments with kafka.

You can directly use the docker image

```bash
$ docker pull rongmz/kafka-browser-graphql
```

Below are the environment variables available.

```javascript
// (optional) The application name to use for embedded kafka client.
APP_NAME  // default: "kafka-browser-graphql"

// (REQUIRED) The list of kafka brokers aka. bootstrap servers
KAFKA_BROKERS // default: ["localhost:9092"]

// (optional) The connection timeout for embedded kafka client
CONNECTION_TIMEOUT

// (optional) The request timeout to use for embedded kafka client
REQUEST_TIMEOUT

// (Optional) The data path to use for this graphql client to use for saving the consumed topic messages. In container, this location should be a writable location.
DATA_PATH // default: "/var/tmp/kafka-browser-graphql"

// (Optional) The download url template if hosting from any customdomain other than localhost.
DOWNLOAD_URL_TEMPLATE   // default: "http://localhost:4000/d"
```

The below port is exposed from container for mapping

```
PORT: 4000
```

## Example screenshot

![Graphql Client 1](https://github.com/rongmz/kafka-browser-graphql/blob/master/images/gql-interface.png?raw=true)
![Graphql Client 1](https://github.com/rongmz/kafka-browser-graphql/blob/master/images/gql-example1.png?raw=true)
