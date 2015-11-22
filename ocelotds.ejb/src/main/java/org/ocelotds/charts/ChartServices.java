/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.charts;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.EJB)
@Stateless
@LocalBean
public class ChartServices {

	public List<Object[]> getDatas(int nb) {
		List<Object[]> datas = new ArrayList<>();
		Long now = new Date().getTime();
		for (int i = nb; i > 0; i--) {
			datas.add(new Object[]{now - i * 1000, Math.random()});
		}
		return datas;
	}
}
