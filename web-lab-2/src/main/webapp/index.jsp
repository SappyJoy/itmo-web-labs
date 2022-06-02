<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="entries" class="com.sappyjoy.weblab2.entities.EntriesBean" scope="session" />
<!DOCTYPE HTML>
<html lang="ru-RU">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="description" content="Лабораторная работа #2">
    <meta name="author" content="Пономарев Степан Алексеевич">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Lab work #2</title>
</head>
<body>
<table id="document" border=1>
    <tr>
        <td id="before-student"></td>
        <td id="header" colspan="3">
            <h1 id="name">Пономарев Степан Алексеевич</h1>
            <h2 id="group">Cтудент группы P33301</h2>
            <p id="variant">Вариант 34401</p>
        </td>
        <td id="after-student"></td>
    </tr>
    <tr>
        <td class="left-col-1"></td>
        <td class="left-col-2"></td>
        <td class="center-col">
            <table id="center-doc" border=1>
                <tr>
                    <td id="coordinate-axes">
                        <canvas id="axes"></canvas>
                    </td>
                    <td id="results">
                        <table id="result-table">
                            <thead>
                            <tr class="result-labels">
                                <th class="result-label">X</th>
                                <th class="result-label">Y</th>
                                <th class="result-label">R</th>
                                <th class="result-label">Result</th>
                                <th class="result-label">Time</th>
                                <th class="result-label">Benchmark</th>
                            </tr>
                            </thead>
                            <tbody id="result-values">
                            <c:forEach var="entry" items="${entries.entries}">
                                <tr>
                                    <td class="result-value">${entry.xValue}</td>
                                    <td class="result-value">${entry.yValue}</td>
                                    <td class="result-value">${entry.rValue}</td>
                                    <td class="result-value">${entry.hitResult}</td>
                                    <td class="result-value">${entry.currentTime}</td>
                                    <td class="result-value">${entry.executionTime}</td>
                                </tr>
                            </c:forEach>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td id="request" colspan="2">
                        <form class="fire-form" id="fire-form_id" action="api" method="GET">
                            <table>
                                <tr>
                                    <td class="form-title">X</td>
                                    <td id="x-checkbox">
                                        <div>
                                            <input type="checkbox" id="x-4" name="x" value="-4">
                                            <label for="x-4">-4</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="x-3" name="x" value="-3">
                                            <label for="x-3">-3</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="x-2" name="x" value="-2">
                                            <label for="x-2">-2</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="x-1" name="x" value="-1">
                                            <label for="x-1">-1</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="x0" name="x" value="0">
                                            <label for="x0">0</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="x+1" name="x" value="1">
                                            <label for="x+1">1</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="x+2" name="x" value="2">
                                            <label for="x+2">2</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="x+3" name="x" value="3">
                                            <label for="x+3">3</label>
                                        </div>
                                        <div>
                                            <input type="checkbox" id="x+4" name="x" value="4">
                                            <label for="x+4">4</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="y-coordinate">
                                    <td class="form-title">Y</td>
                                    <td><input type="text" name="y" maxlength="10" size="5" placeholder="-5...5"></td>
                                </tr>
                                <tr id="r-value">
                                    <td class="form-title">R</td>
                                    <td><input type="text" name="r" maxlength="10" size="5" placeholder="1...4"></td>
                                </tr>
                                <input id="timezone" type="hidden" name="timezone" value="">
                                <tr>
                                    <td></td>
                                    <td><input type="submit" id="submit-button" value="Fire!"></td>
                                </tr>
                            </table>
                        </form>
                    </td>
                </tr>
            </table>
        </td>
        <td class="right-col-2"></td>
        <td class="right-col-1"></td>
    </tr>
    <tr id="center-row">
        <td class="left-col-1"></td>
        <td class="center-col" id="output-container" colspan="3">
            <%
                if (request.getAttribute("error") != null) {
                    out.println("<h4><span class=\"notification\">" + request.getAttribute("error") + "</span></h4>");
                }
            %>
        </td>
        <td class="right-col-1"></td>
    </tr>
</table>
<script src="scripts/coordinate-axes.js"></script>
<script src="scripts/validator.js"></script>
</body>
</html>