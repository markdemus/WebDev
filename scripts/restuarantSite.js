function greetTheUser() {
    document.getElementById("userName").innerText = document.getElementById("inputName").value;
    document.getElementById("greeting").style.display = "block";
}

<script type="text/javascript">
        
    </script>
</head>
<body>
    <div>
        Enter your name: <input type="text" id="userName" placeholder="Name" />
        <button onclick="greetTheUser();">Show Greeting</button>
    </div>
    <div id="greeting" style="display:none;">
        <h1>Hi, <span id="userName"></span>!</h1>
    </div>
