/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.charts;

import java.util.Date;
import org.ocelotds.marshalling.JsonMarshaller;
import org.ocelotds.marshalling.exceptions.JsonMarshallingException;

/**
 * 
 * @author hhfrancois
 */
public class DataMarshaller implements JsonMarshaller<Object>{
	@Override
	public String toJson(Object obj) throws JsonMarshallingException {
		Object[] datas = (Object[]) obj;
		Date d = (Date) datas[0];
		float f = (float) datas[1];
			return String.format("[%s,%s]", d.getTime(), f);
	}
}
