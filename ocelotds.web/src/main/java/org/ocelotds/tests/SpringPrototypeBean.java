/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.tests;

import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.SPRING)
public class SpringPrototypeBean {
	private int count = 0;
	
	public int getCount() {
		return count++;
	}
	
	@Autowired
	private SpringSingletonBean springSingletonBean;

	public int getCountFromSingleton() {
		return springSingletonBean.getCount();
	}
	
	public void initSingleton() {
		springSingletonBean.init();
	}
}
