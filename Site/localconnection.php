<?php
session_start();
if (session_id() == "") {
    echo "Nothing works!";
    exit();
}
ob_start();


if (isset($_SESSION['suser_name'])) {
    $suser_name = $_SESSION['suser_name'];
    $parts = explode('@', $suser_name);
    $name = $parts[0];
    $displayedname = $name;
} else {
    $suser_name = "Guest";
    $displayedname = "Guest";
}

if (isset($_SESSION['utype']))
    $stype = $_SESSION['utype'];
else
    $stype = " ";


$hostname = '127.0.0.1';
$dbusername = 'root';             // Your old database username.
$dbpassword = 'oracleoracle';
//$dbpassword = 'please change your pass here and comment the mine plz';                 // Your old database password. If your database has no password, leave it empty.
$dbname = 'Hackthon-bitnob';                 // Your old database name.
$today = date("Y-m-d");
$todayClock = date("H:i:s");

//here to set the date , with the correct format
//$today = "2017-12-14";

list($Tyear, $Tmonth, $Tday) = explode("-", $today);
list($Thour, $Tmin, $Tsec) = explode(":", $todayClock);


$link = new mysqli("$hostname", "$dbusername", "$dbpassword", "$dbname");
if (mysqli_connect_errno()) {
    die("MySQL connection failed: " . mysqli_connect_error());
}
