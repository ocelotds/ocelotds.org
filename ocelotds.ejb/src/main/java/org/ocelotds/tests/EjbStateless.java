/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.tests;

import java.security.Principal;
import java.util.Date;
import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;

/**
 *
 * @author hhfrancois
 */
@Stateless
@DataService(resolver = Constants.Resolver.EJB)
public class EjbStateless {

	@Resource
	private SessionContext sc;
	
	@Inject
	private Principal principal;

	public Date getDate() {
		Date d = new Date();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException ex) {
		}
		return d;
	}

	public String getCDIPrincipalName() {
		return principal.getName();
	}

	public String getCtxPrincipalName() {
		return sc.getCallerPrincipal().getName();
	}

	public boolean isUserInRole(String role) {
		return sc.isCallerInRole(role);
	}

	@RolesAllowed("USERR")
	public void callAuthorized() {
	}

	@RolesAllowed("ADMINR")
	public void callUnauthorized() {
	}
}
