package com.sappyjoy.weblab2.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@MultipartConfig
public class ControllerServlet extends HttpServlet {

  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    System.out.println("ControllerServlet.doGet: req=" + req.toString());

    Enumeration<String> params = req.getParameterNames();
    int i = 0;
    while (params.hasMoreElements()) {
      String param = params.nextElement();
      System.out.println("param[" + i + "]: " + param + "=" + req.getParameter(param));
      i++;
    }
    if (req.getParameter("x") != null && req.getParameter("y") != null &&
        req.getParameter("r") != null && req.getParameter("timezone") != null) {
      System.out.println("Redirected to AreaCheckServlet");
      getServletContext().getNamedDispatcher("AreaCheckServlet").forward(req, resp);
    } else {
      req.setAttribute("error", "Введены неверные параметры запроса");
      getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
    }
  }

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp)
      throws ServletException, IOException {
    System.out.println("ControllerServlet.doPost: req=" + req.toString());
    getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
  }
}
