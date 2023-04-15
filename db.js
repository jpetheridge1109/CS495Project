let json;
export async function findOne(collection, filter) {
  try {
    const response = await fetch('https://us-east-2.aws.data.mongodb-api.com/app/data-upeqz/endpoint/data/v1/action/findOne',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'ujz8gEvjLM3N0sxoWZ40g8S9rvmNxsGAutAbFrNv3ZIJA8Fje7rYsRzyWMLPcQUn',
        Accept: 'application/json',
        'User-Agent': 'PostmanRuntime/7.31.1',
        Host: 'us-east-2.aws.data.mongodb-api.com',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
      body: JSON.stringify({
        dataSource: "CS495",
        database: "db",
        collection: collection,
        filter: filter
      }),
    });
    json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function find(collection, filter) {
  try {
    const response = await fetch('https://us-east-2.aws.data.mongodb-api.com/app/data-upeqz/endpoint/data/v1/action/find',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'ujz8gEvjLM3N0sxoWZ40g8S9rvmNxsGAutAbFrNv3ZIJA8Fje7rYsRzyWMLPcQUn',
        Accept: 'application/json',
        'User-Agent': 'PostmanRuntime/7.31.1',
        Host: 'us-east-2.aws.data.mongodb-api.com',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
      body: JSON.stringify({
        dataSource: "CS495",
        database: "db",
        collection: collection,
        filter: filter
      }),
    });
    json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function aggregation(collection, pipeline) {
  try {
    const response = await fetch('https://us-east-2.aws.data.mongodb-api.com/app/data-upeqz/endpoint/data/v1/action/aggregate',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'ujz8gEvjLM3N0sxoWZ40g8S9rvmNxsGAutAbFrNv3ZIJA8Fje7rYsRzyWMLPcQUn',
        Accept: 'application/json',
        'User-Agent': 'PostmanRuntime/7.31.1',
        Host: 'us-east-2.aws.data.mongodb-api.com',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
      body: JSON.stringify({
        dataSource: "CS495",
        database: "db",
        collection: collection,
        pipeline: pipeline
      }),
    });
    json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function insertOne(collection, object) {
  try {
    const response = await fetch('https://us-east-2.aws.data.mongodb-api.com/app/data-upeqz/endpoint/data/v1/action/insertOne',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'ujz8gEvjLM3N0sxoWZ40g8S9rvmNxsGAutAbFrNv3ZIJA8Fje7rYsRzyWMLPcQUn',
        Accept: 'application/json',
        'User-Agent': 'PostmanRuntime/7.31.1',
        Host: 'us-east-2.aws.data.mongodb-api.com',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
      body: JSON.stringify({
        dataSource: "CS495",
        database: "db",
        collection: collection,
        document: object
      }),
    });
    json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function updateOne(collection, filter, update) {
  try {
    const response = await fetch('https://us-east-2.aws.data.mongodb-api.com/app/data-upeqz/endpoint/data/v1/action/updateOne',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'ujz8gEvjLM3N0sxoWZ40g8S9rvmNxsGAutAbFrNv3ZIJA8Fje7rYsRzyWMLPcQUn',
        Accept: 'application/json',
        'User-Agent': 'PostmanRuntime/7.31.1',
        Host: 'us-east-2.aws.data.mongodb-api.com',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
      body: JSON.stringify({
        dataSource: "CS495",
        database: "db",
        collection: collection,
        filter: filter,
        update: update
      }),
    });
    json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}