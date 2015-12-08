/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds;

import javax.enterprise.inject.Produces;
import org.ocelotds.configuration.OcelotConfigurationName;
import org.ocelotds.configuration.annotations.OcelotConfiguration;

/**
 *
 * @author hhfrancois
 */
public class OcelotConfig {
	
	@Produces
	@OcelotConfiguration(OcelotConfigurationName.SECURE)
	String getProtocolSecure() {
		return "false";
	}
	
	@Produces
	@OcelotConfiguration(OcelotConfigurationName.STACKTRACELENGTH)
	String getStackLength() {
		return "10";
	}
}
