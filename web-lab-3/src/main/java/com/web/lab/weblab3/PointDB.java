package com.web.lab.weblab3;

import javax.annotation.ManagedBean;
import javax.annotation.PostConstruct;
import javax.faces.bean.ApplicationScoped;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@ManagedBean
@ApplicationScoped
public class PointDB {
    private DataSource dataSource;

    private Connection connection;

    @PostConstruct
    public void init() throws NamingException {
        initConnection();
    }

    private void initConnection() throws NamingException {
        String url = "jdbc:postgresql://localhost/itmo-web-course";
        String user = "admin";
        String password = "password";

        try {
            connection = DriverManager.getConnection(url, user, password);
            System.out.println("Connection completed.");
            connection.createStatement().execute(
                    "create table if not exists results (" +
                            "x float , y float, r float, res text, owner text)"
            );
        } catch (SQLException e) {
            throw new IllegalStateException("Couldn't create connection", e);
        }
    }

    public void addPointToTable(Point point){
        try {
            if (connection == null) {
                initConnection();
            }
            PreparedStatement preparedStatement = connection.prepareStatement(
                    "INSERT INTO results VALUES (?, ?, ?, ?, ?)"
            );
            preparedStatement.setDouble(1,point.getX());
            preparedStatement.setDouble(2,point.getY());
            preparedStatement.setFloat(3,point.getR());
            preparedStatement.setString(4,point.getRes());
            preparedStatement.setString(5,point.getOwner());
            preparedStatement.execute();
        } catch (NamingException | SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Point> getPoints(String session_id){
        List<Point> pointsList = new ArrayList<>();
        try {
            if (connection == null)
                initConnection();
            ResultSet rs = connection.createStatement().executeQuery("select * from results");
            while (rs.next()) {
                Point point = new Point();
                point.setX(rs.getFloat("x"));
                point.setY(rs.getFloat("y"));
                point.setR(rs.getFloat("r"));
                point.setRes(rs.getString("res"));
                if (rs.getString("owner").equals(session_id)) {
                    pointsList.add(0,point);
                }
            }
        }catch (SQLException | NamingException throwable) {
            throwable.printStackTrace();
        }
        return pointsList;
    }
}
