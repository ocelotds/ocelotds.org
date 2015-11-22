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
@WebServlet(urlPatterns = {"/documentations"})
public class DocServlet extends HttpServlet {

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
			String[] docs = new String[]{"/docs/quickstart.html",
				"/docs/features/features.html", "/docs/features/exposesrv.html", "/docs/features/useit.html", "/docs/features/cache.html",
				"/docs/features/push.html", "/docs/features/qos.html", "/docs/features/i18n.html", "/docs/features/security.html", "/docs/features/advanced.html",
				"/docs/servers/servers.html", "/docs/servers/glassfish.html", "/docs/servers/wildfly.html", "/docs/servers/tomcat.html", "/docs/servers/other.html",
				"/docs/backend/backend.html", "/docs/backend/ejb.html", "/docs/backend/cdi.html", "/docs/backend/spring.html",
				"/docs/frontend/frontend.html", "/docs/frontend/html.html", "/docs/frontend/ocelotsrv.html", "/docs/frontend/ocelotctrl.html", 
				"/docs/frontend/ocelotpromise.html", "/docs/frontend/objects.html", "/docs/frontend/advanced.html",
				"/docs/extends/extends.html", "/docs/extends/resolver.html", "/docs/extends/security.html"
			};
			for (String doc : docs) {
				out.write("<div class=\"container bs-docs-container\" role=\"main\"><div class=\"row\"><div class=\"col-md-9\"><div class=\"bs-docs-section\">");
				InputStream docstream = request.getServletContext().getResourceAsStream(doc);
				try (BufferedReader reader = new BufferedReader(new InputStreamReader(docstream, "UTF-8"))) {
					while (reader.ready()) {
						String line = reader.readLine();
						if (line != null) {
							line = line.replaceAll("%ROOT%", servletRequest.getContextPath());
							out.println(line);
						}
					}
				}
				out.write("</div></div>");
				InputStream summary = request.getServletContext().getResourceAsStream("/docs/complementary.html");
				try (BufferedReader reader = new BufferedReader(new InputStreamReader(summary, "UTF-8"))) {
					while (reader.ready()) {
						String line = reader.readLine();
						if (line != null) {
							line = line.replaceAll("%ROOT%", servletRequest.getContextPath());
							out.println(line);
						}
					}
				}
				out.write("</div></div>");
			}
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
