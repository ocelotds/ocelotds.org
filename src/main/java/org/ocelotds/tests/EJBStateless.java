/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.tests;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.annotation.security.DeclareRoles;
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
@DeclareRoles({"USERR", "ADMINR"})
public class EJBStateless {

	@Resource
	private SessionContext sc;
	
	public String getEJBPrincipalName() {
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
