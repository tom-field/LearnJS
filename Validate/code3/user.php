<?php
	/*
	帐号被占用
	if ($_GET['user'] == 'bnbbs') {
		echo 'false';
	} else {
		echo 'true';
	}
	*/
	
	if ($_POST['user'] == 'bnbbs' && $_POST['pass'] == '123456') {
		echo 'true';
	} else {
		echo 'false';
	}
?>