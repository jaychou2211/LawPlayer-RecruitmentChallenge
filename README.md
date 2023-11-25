### **How to set up**

1. 修改 `.env.sample`：
    - 改為 `.env`
    - 將 `IMGUR_CLIENT_ID` 替換為自己的 imgurClientId

2. 執行 `npm run start`，並藉 `http://localhost:3000/posts` 和 server 互動

---
### **File structure**

```
.
└── src/
    ├── api-gateway/
    │   ├── app.module.ts
    │   └── main.ts
    ├── common/
    │   └── lowdb/
    │       ├── lowdb.service.ts
    │       └── lowdb.module.ts
    ├── imageUpload/
    │   ├── application/
    │   │   ├── ports/
    │   │   │   └── IImageUploader.ts
    │   │   └── imageUpload.service.ts
    │   ├── infrastructure/
    │   │   └── imgurUploader.ts
    │   └── imageUpload.module.ts
    └── posts/
        ├── application/
        │   ├── ports/
        │   │   └── IRepository.ts
        │   └── usecase/
        │       ├── createNewPost.ts
        │       └── listAllPosts.ts
        ├── domain/
        │   ├── posts.ts
        │   └── status.ts
        ├── infrastructure/
        │   ├── primaries/
        │   │   ├── createPost.dto.ts
        │   │   └── post.controller.ts
        │   └── secondaries/
        │       └── post.repository.ts
        └── post.module.ts
```
---
### **Explanation of the Structure**

- **api-gateway**
 
    - 所有 domain(module) 的 controller 都會被提供到這裡，並統一成為app.module(根)的 `controllers`。
    ( 雖然現在只有 `posts` 內含controller )

- **common**

    - 數個不同 domain 會共用的資源(也許未來的情境不會只有`posts`這個概念)。
    - 例如：DB 的 dataSource。
    這裡是採 `lowdb` 搭配 `json file` 以模擬資料庫。

- **imageUpload**

    - 負責：
        - 爬下用戶提供的連結所對應的圖片
        - 另外上傳到imgur，並保存其 imgur 網址

- **posts**

    - 負責關於 posts 的 crud。
---
### **Clean Architecture**

- `imageUpload` 和 `posts` 兩個概念都是採用 **乾淨架構** 設計
- 分為：
    - 內層(business rule)： 
        - application
            - usecases
            - ports ：內含僅表意圖的interfaces、abstract class
        - domain
    - 外層(涉及第三方的技術細節)：
        - primaries ( controller、presenter … )
        
            > 會呼叫 service、usecase 的。
        - secondaries ( db、websocket …)
        
            > 會被 service、usecase 呼叫的。
            > 這裡通常會藉由具體類別實作(impelement)位於內層訂定的port(interface)。
            >
            > 例[1]：ImgurUploader  —實作→ IImageUploader
            >
            > 例[2]：PostRepository —實作→ IRepository
            >
            > 以達成依賴反轉：
            > 1. 使內層不必知道技術細節，只需要執行自身的意圖即可。
            > 2. 好抽換，以增加擴充性和可測試性
