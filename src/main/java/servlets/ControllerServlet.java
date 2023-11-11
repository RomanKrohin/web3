package servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import utils.Result;
import utils.ResultsBean;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet{

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    try {
        String x = (request.getParameter("x"));
        String y = (request.getParameter("y"));
        String R = (request.getParameter("R"));

        HttpSession session = request.getSession(true);
        ResultsBean resultsBean = (ResultsBean) session.getAttribute("resultsBean");
        resultsBean.getNewResult().setX(x);
        resultsBean.getNewResult().setY(y);
        resultsBean.getNewResult().setR(R);
        resultsBean.addNewReult();
    } catch (Exception e) {
        request.setAttribute("error", e.toString());
        request.getRequestDispatcher("/error.jsp").forward(request, response);
    }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String errorMessage = "Возникла проблема при обработке запроса.";
        request.setAttribute("error", errorMessage);
        request.getRequestDispatcher("/error.jsp").forward(request, response);
    }
}