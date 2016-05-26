/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author hhfrancois
 */
@WebFilter(filterName = "Templater", urlPatterns = {"*.html"})
public class Templater implements Filter {

	/**
	 *
	 * @param request The servlet request we are processing
	 * @param response The servlet response we are creating
	 * @param chain The filter chain we are processing
	 *
	 * @exception IOException if an input/output error occurs
	 * @exception ServletException if a servlet error occurs
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest servletRequest = HttpServletRequest.class.cast(request);
		String pageRequested = servletRequest.getRequestURI();
		if(isTemplatePage(pageRequested)) {
			InputStream before = request.getServletContext().getResourceAsStream("/templates/before.html");
			try (BufferedReader reader = new BufferedReader(new InputStreamReader(before, "UTF-8"))) {
				while (reader.ready()) {
					String line = reader.readLine();
					if (line != null) {
						line = line.replaceAll("%ROOT%", servletRequest.getContextPath());
						if (line.contains("\"" + pageRequested + "\"")) {
							line = line.replace("<li", "<li class='active'");
						}
						response.getWriter().println(line);
					}
				}
			}
		}
		chain.doFilter(request, response);

		if(isTemplatePage(pageRequested)) {
			InputStream after = request.getServletContext().getResourceAsStream("/templates/after.html");
			try (BufferedReader reader = new BufferedReader(new InputStreamReader(after, "UTF-8"))) {
				while (reader.ready()) {
					String line = reader.readLine();
					if (line != null) {
						line = line.replaceAll("%ROOT%", servletRequest.getContextPath());
						response.getWriter().println(line);
					}
				}
			}
		}
	}
	
	boolean isTemplatePage(String pageRequested) {
		return !pageRequested.contains("ocelot/dashboard");
	}
	

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void destroy() {
	}
}
