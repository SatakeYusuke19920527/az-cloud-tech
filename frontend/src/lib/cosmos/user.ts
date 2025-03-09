import { CosmosClient } from '@azure/cosmos';

// ユーザーをDBへ登録
export const createUser = async (clerkId: string, email: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cosmosClient = new CosmosClient(
        process.env.COSMOS_CONNECTION_STRING!
      );
      const database = cosmosClient.database(process.env.COSMOS_DATABASE_NAME!);
      const container = database.container(process.env.COSMOS_CONTAINER_NAME!);

      // 新規のユーザードキュメントを作成
      // idにはCosmos DBのユニークIDが必要となるので、通常はclerkIdやUUID等をそのまま渡すことが多いです
      const { resource } = await container.items.create({
        id: clerkId, // ここではclerkIdをそのままidとして利用
        clerkId: clerkId,
        email: email,
        createdAt: new Date().toISOString(),
      });

      // 作成したリソースを返却
      resolve(resource);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
