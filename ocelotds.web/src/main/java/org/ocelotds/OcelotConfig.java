/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds;

import java.util.Arrays;
import java.util.Collection;
import javax.enterprise.inject.Produces;
import org.ocelotds.annotations.OcelotConfiguration;
/**
 *
 * @author hhfrancois
 */
public class OcelotConfig {
	
	@Produces
	@OcelotConfiguration(Constants.Options.STACKTRACE_LENGTH)
	String getStackLength() {
		return "10";
	}
//	@Produces
//	@OcelotConfiguration(Constants.Options.DASHBOARD_ROLES)
	Collection<String> roles = Arrays.asList("ADMIN");
}
