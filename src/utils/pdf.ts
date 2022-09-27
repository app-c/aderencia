export const pdf = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <div>

        <h1 style="font-size: 40px; font-family: Helvetica Neue; font-weight: normal;">
          WILLIAM
        </h1>

        <div
          style="display: flex; justify-content: space-between; padding: 20px; ;"
        >
          <h1>item</h1>
          <h1>descrição</h1>
          <h1>situação</h1>
        </div>

        <div
          style="background-color: yellow;display: flex; justify-content: space-between; padding: 20px; align-items: center ; box-sizing: border-box;"
        >
          <h1>item</h1>

          <div style="
                background-color: red;
                text-align: center;
                box-sizing: border-box;
                color: white;
                max-width: 400px;
              " 
            
            />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id voluptate sunt maiores ipsa recusandae sint laboriosam obcaecati in, velit et molestias laudantium quos aperiam vero aspernatur quisquam fugit? Eligendi.</p>

          </div>

          <h1>FEITO</h1>

        </div>
        <h1>my list</h1>
        <ul id="myList" ></ul>
    </div>

    <script>
      let data = ["Ram", "Shyam", "Sita", "Gita"];
      
      let list = document.getElementById("myList");

      data.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
      });
    </script>

  </body>
</html>
`;
