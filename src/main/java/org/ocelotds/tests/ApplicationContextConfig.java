/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.tests;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

/**
 *
 * @author hhfrancois
 */
@Configuration
public class ApplicationContextConfig {

	@Bean
	public SpringSingletonBean springSingletonBean() {
		System.out.println("GET SpringSingletonBean");
		return new SpringSingletonBean();
	}

	@Bean
	@Scope(value = "client")
	public SpringSessionBean springSessionBean() {
		return new SpringSessionBean();
	}

	@Bean
	@Scope(value = "prototype")
	public SpringPrototypeBean springPrototypeBean() {
		return new SpringPrototypeBean();
	}
}
