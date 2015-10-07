/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author hhfrancois
 */
@WebServlet(name = "Signup", urlPatterns = {"/signup", "/signfail"})
public class SignupServlet extends HttpServlet {

	/**
	 * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	protected void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		HttpServletRequest servletRequest = HttpServletRequest.class.cast(request);
		String pageRequested = servletRequest.getRequestURI();
		InputStream before = request.getServletContext().getResourceAsStream("/templates/before.html");
		try (PrintWriter out = response.getWriter()) {
			try (BufferedReader reader = new BufferedReader(new InputStreamReader(before, "UTF-8"))) {
				while (reader.ready()) {
					String line = reader.readLine();
					if (line != null) {
						line = line.replaceAll("%ROOT%", servletRequest.getContextPath());
						if (line.contains("\"" + pageRequested + "\"")) {
							line = line.replace("<li", "<li class='active'");
						}
						out.println(line);
					}
				}
			}
			out.println("<div class=\"container\">");
			out.println("	<form class=\"form-signin\" action=\"/j_security_check\" method=\"POST\">");
			out.println("		<h2 class=\"form-signin-heading\">Please sign up</h2>");
			if (pageRequested.equals("/signfail")) {
				out.println("		<h4>Try again</h4>");
			}
			out.println("		<label for=\"j_username\" class=\"sr-only\">Login</label>");
			out.println("		<input id=\"j_username\" name=\"j_username\" class=\"form-control\" placeholder=\"demo\" required autofocus>");
			out.println("		<label for=\"j_password\" class=\"sr-only\">Password</label>");
			out.println("		<input type=\"password\" id=\"j_password\" name=\"j_password\" class=\"form-control\" placeholder=\"demo\" required>");
			out.println("		<button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign up</button>");
			out.println("	</form>");
			out.println("</div> <!-- /container -->");
			InputStream after = request.getServletContext().getResourceAsStream("/templates/after.html");
			try (BufferedReader reader = new BufferedReader(new InputStreamReader(after, "UTF-8"))) {
				while (reader.ready()) {
					String line = reader.readLine();
					if (line != null) {
						line = line.replaceAll("%ROOT%", servletRequest.getContextPath());
						out.println(line);
					}
				}
			}
		}
	}

	// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
	/**
	 * Handles the HTTP <code>GET</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			  throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * Handles the HTTP <code>POST</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			  throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * Returns a short description of the servlet.
	 *
	 * @return a String containing servlet description
	 */
	@Override
	public String getServletInfo() {
		return "Short description";
	}// </editor-fold>

}
