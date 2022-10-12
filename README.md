# joguito

## Starting Development Server

Using python:
```
python -m http.server 9000
```

Using PHP ([How to Install PHP](https://www.php.net/manual/en/install.php)):
```
PHP -S localhost:9000
```
<br>
and open the game using your browser and typing:

```
localhost:9000
```

<hr><br>

## Current Folder Format
<br>

📦 joguito<br>
 ┣ 📂assets<br>
 ┃ ┣ 📜Generic image assets which can be used anywhere<br>
 ┃ ┣ 📂audio<br>
 ┃ ┃ ┣ 📜 Audios used in project<br>
 ┃ ┣ 📂map<br>
 ┃ ┃ ┣ 📜All Map json and TMX files<br>
 ┣ 📂src<br>
 ┃ ┣ 📂components<br>
 ┃ ┃ ┣ 📜Generic but necessary javascript components (such as phaser.js)<br>
 ┃ ┣ 📂scenes<br>
 ┃ ┃ ┣ 📜Scene Files<br>
 ┃ ┣ 📂styles<br>
 ┃ ┃ ┗ 📜CSS StyleSheets<br>