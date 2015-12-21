/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.charts;

import java.util.Date;
import java.util.Random;
import javax.ejb.Schedule;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.enterprise.event.Event;
import javax.inject.Inject;
import org.ocelotds.annotations.JsTopicEvent;
import org.ocelotds.marshalling.annotations.JsonMarshaller;

/**
 *
 * @author hhfrancois
 */
@Singleton
@Startup
public class DataPublisher {

	@Inject
	@JsTopicEvent("values")
	@JsonMarshaller(DataMarshaller.class)
	Event<Object> topicEvent;

	@Schedule(dayOfWeek = "*", month = "*", hour = "*", dayOfMonth = "*", year = "*", minute = "*", second = "*/1", persistent = false)
	public void publishDatas() {
		Random randomGenerator = new Random();
		topicEvent.fire(new Object[]{new Date(), randomGenerator.nextFloat()});
	}
}
