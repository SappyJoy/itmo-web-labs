package com.sappyjoy.weblab2.servlets;

import com.sappyjoy.weblab2.entities.EntriesBean;
import com.sappyjoy.weblab2.entities.Entry;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
public class AreaCheckServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    System.out.println("AreaCheckServlet.doGet: req=" + req.toString());

    long startTime = System.nanoTime();

    String xString = req.getParameter("x");
    String yString = req.getParameter("y").replace(',', '.');
    String rString = req.getParameter("r");

    System.out.println("x=" + xString + " y=" + yString + " r=" + rString);

    boolean isValuesValid = validateValues(xString, yString, rString);

    if (isValuesValid) {
      System.out.println("AreaCheckServlet.doPost: values are valid");
      double xValue = Double.parseDouble(xString);
      double yValue = Double.parseDouble(yString);
      double rValue = Double.parseDouble(rString);
      boolean isHit = checkHit(xValue, yValue, rValue);

      OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
      String currentTime;
      try {
        currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(req.getParameter("timezone")));
      } catch (Exception exception) {
        req.setAttribute("error", "Не установлена временная зона");
      }

      currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("HH:mm:ss"));

      String executionTime = String.valueOf((System.nanoTime() - startTime) / 10E6);

      EntriesBean entries = (EntriesBean) req.getSession().getAttribute("entries");
      if (entries == null) entries = new EntriesBean();
      entries.getEntries().add(new Entry(xValue, yValue, rValue, currentTime, executionTime, isHit));
      req.getSession().setAttribute("entries", entries);
    } else {
      req.setAttribute("error", "Данные GET запроса невалидны");
    }

    EntriesBean entries = (EntriesBean) req.getSession().getAttribute("entries");
    System.out.println("Entries: ");
    for (Entry entry : entries.getEntries()) {
      System.out.println("x=" + entry.getxValue() + " y=" + entry.getyValue() + " r=" + entry.getrValue() + " result=" + entry.isHitResult());
    }

    getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
  }

  private boolean validateX(String xString) {
    try {
      Integer[] xRange = { -4, -3, -2, -1, 0, 1, 2, 3, 4 };
      int xValue = Integer.parseInt(xString);
      return Arrays.asList(xRange).contains(xValue);
    } catch (NumberFormatException exception) {
      return false;
    }
  }

  private boolean validateY(String yString) {
    try {
      double yValue = Double.parseDouble(yString);
      return yValue >= -5 && yValue <= 5;
    } catch (NumberFormatException exception) {
      return false;
    }
  }

  private boolean validateR(String rString) {
    try {
      double rValue = Double.parseDouble(rString);
      return rValue >= 1 && rValue <= 4;
    } catch (NumberFormatException exception) {
      return false;
    }
  }

  private boolean validateValues(String xString, String yString, String rString) {
    return validateX(xString) && validateY(yString) && validateR(rString);
  }

  private boolean atSecondQuarter(double x, double y, double r) {
    return x <= 0 && y >= 0 && -x <= -y + r;
  }

  private boolean atThirdQuarter(double x, double y, double r) {
    return x <= 0 && y <= 0 && Math.sqrt(x*x + y*y) <= r;
  }

  private boolean atFourthQuarter(double x, double y, double r) {
    return x >= 0 && y <= 0 && x <= r/2 && y >= -r;
  }

  private boolean checkHit(double x, double y, double r) {
    return atSecondQuarter(x, y, r) || atThirdQuarter(x, y, r) ||
        atFourthQuarter(x, y, r);
  }
}
