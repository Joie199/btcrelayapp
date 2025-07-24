<?php 
include 'localconnection.php';
##for testing we have two accounts
$querytest1 = "INSERT INTO members (`M_name`, `M_password`, `M_type`) SELECT 'testuser@test.com', 'testuser' , 'user' WHERE NOT EXISTS ( SELECT 1 FROM members WHERE M_name = 'testuser@test.com' )";
$querytest2 = "INSERT INTO members (`M_name`, `M_password`, `M_type`) SELECT 'testvendor@test.com', 'testvendor' , 'vendor' WHERE NOT EXISTS ( SELECT 1 FROM members WHERE M_name = 'testvendor@test.com' )";

mysqli_query($link, $querytest1);
mysqli_query($link, $querytest2);

?>