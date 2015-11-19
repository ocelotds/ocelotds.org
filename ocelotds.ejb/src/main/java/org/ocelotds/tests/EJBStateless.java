/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.tests;

import java.util.Date;
import javax.annotation.Resource;
import javax.annotation.security.RolesAllowed;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;

/**
 *
 * @author hhfrancois
 */
@Stateless
@DataService(resolver = Constants.Resolver.EJB)
public class EJBStateless {

	@RolesAllowed("USERR")
	public Date getDate() {
		Date d = new Date();
		try {
			Thread.sleep(2000);
		} catch (InterruptedException ex) {
		}
		return d;
	}

	@Resource
	private SessionContext sc;

	@RolesAllowed("USERR")
	public String getEJBPrincipalName() {
		return sc.getCallerPrincipal().getName();
	}

	@RolesAllowed("USERR")
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
