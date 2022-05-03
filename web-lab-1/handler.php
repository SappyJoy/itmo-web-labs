<?php

error_reporting(0);

function isDataValid($x, $y, $r)
{
    return
        is_numeric($x) && $x > -3 && $x < 3 &&
        in_array($y, array(-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2), false) &&
        in_array($r, array(1, 1.5, 2, 2.5, 3), false);
}

function atFirstQuarter($x, $y, $r)
{
    return (($x >= 0) && ($y >= 0) && ($x <= $r) && ($y <= $r) && ($x <= -$y + $r));
}

function atSecondQuarter($x, $y, $r)
{
    return (($x <= 0) && ($y >= 0) && (($x * $x + $y * $y) <= $r * $r));
}

function atThirdQuarter($x, $y, $r)
{
    return (($x <= 0) && ($y <= 0) && ($y >= -$r) && ($x >= -$r / 2));
}


function atArea($x, $y, $r)
{
    return (atFirstQuarter($x, $y, $r) || atSecondQuarter($x, $y, $r) || atThirdQuarter($x, $y, $r));
}

$x = isset($_GET["x"]) ? $_GET["x"] : 0;
$y = isset($_GET["y"]) ? str_replace(",", ".", $_GET["y"]) : 0;
$r = isset($_GET["r"]) ? $_GET["r"] : 2;
$timezoneOffset = isset($_GET["timezone"]) ? $_GET["timezone"] : 0;

if (!isDataValid($x, $y, $r)) {
    http_response_code(400);
    return;
}

$coordsStatus = atArea($x, $y, $r);
$currentTime = date("H:i:s", time()-$timezoneOffset*60);
$benchmarkTime = number_format(microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"], 10, ".", "") * 1000000;

$result = $coordsStatus ? 'true' : 'false';

$jsonData = '{' .
    "\"x\":\"$x\"," .
    "\"y\":\"$y\"," .
    "\"r\":\"$r\"," .
    "\"result\":$result," .
    "\"currentTime\":\"$currentTime\"," .
    "\"benchmarkTime\":\"$benchmarkTime\"" .
    "}";

echo $jsonData;
