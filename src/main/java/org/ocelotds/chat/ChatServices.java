/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.chat;

import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import org.ocelotds.annotations.JsTopic;
import java.util.ArrayList;
import java.util.Collection;
import javax.inject.Singleton;

/**
 *
 * @author hhfrancois
 */
@Singleton
@DataService(resolver = Constants.Resolver.CDI)
public class ChatServices {

	private static final Collection<String> chatters = new ArrayList<>();

	/**
	 * Register chatter
	 *
	 * @param chatter
	 * @return
	 * @throws org.ocelotds.angular.ChatterAlreadyExistException
	 * @throws org.ocelotds.angular.ChatterInconsistentException
	 */
	@JsTopic(value = "Chatters")
	public ChatterEvent register(String chatter) throws ChatterAlreadyExistException, ChatterInconsistentException {
		if (null == chatter || chatter.isEmpty()) {
			throw new ChatterInconsistentException("empty");
		}
		if (chatters.contains(chatter)) {
			throw new ChatterAlreadyExistException(chatter);
		}
		chatters.add(chatter);
		return new ChatterEvent("ADD", chatter);
	}

	/**
	 * Unregister chatter
	 *
	 * @param chatter
	 * @return
	 */
	@JsTopic(value = "Chatters")
	public ChatterEvent unregister(String chatter) {
		if (chatters.contains(chatter)) {
			chatters.remove(chatter);
		}
		return new ChatterEvent("DEL", chatter);
	}

	@JsTopic(value = "ChatRoom")
	public Message postMessage(Message message) throws MessageInconsistentException {
		if (null == message || message.getChatter() == null || message.getText()==null || message.getChatter().isEmpty() || message.getText().isEmpty()) {
			throw new MessageInconsistentException();
		}
		return message;
	}

	public Collection<String> getChatters() {
		return chatters;
	}
}
