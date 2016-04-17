/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.tests;

import javax.inject.Inject;
import org.ocelotds.annotations.OcelotLogger;
import org.ocelotds.security.JsTopicMessageController;
import org.slf4j.Logger;
import org.ocelotds.annotations.JsTopicControl;
import org.ocelotds.annotations.JsTopicControls;
import org.ocelotds.security.NotRecipientException;
import org.ocelotds.security.UserContext;

/**
 * 
 * @author hhfrancois
 */
@JsTopicControls({
	@JsTopicControl("string5topic"),
	@JsTopicControl("string5topicBis")
})
public class StringMin5TopicMessageController implements JsTopicMessageController<String> {

	@Inject
	@OcelotLogger
	private Logger logger;
	
	@Override
	public void checkRight(UserContext ctx, String topic, String payload) throws NotRecipientException {
		boolean access = (payload!=null)?payload.length()>4:false;
		System.out.println("CHECK payload lengh > 4 : "+access+" for topic "+topic);
		logger.debug("Check mytopic access to topic {} : access = {}", "admintopic", access);
		if(!access) {
			throw new NotRecipientException(ctx.getPrincipal().getName());
		}
	}
	
}
