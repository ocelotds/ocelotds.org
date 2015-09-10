/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.chat;

import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import org.ocelotds.annotations.JsTopic;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Objects;
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
	 * @throws ChatterAlreadyExistException
	 * @throws ChatterInconsistentException
	 */
	@JsTopic("Chatters")
	public Collection<String> register(String chatter) throws ChatterAlreadyExistException, ChatterInconsistentException {
		if (Objects.isNull(chatter) || chatter.isEmpty()) {
			throw new ChatterInconsistentException("empty");
		}
		if (chatters.contains(chatter)) {
			throw new ChatterAlreadyExistException(chatter);
		}
		chatters.add(chatter);
		return chatters;
	}

	/**
	 * Unregister chatter
	 *
	 * @param chatter
	 * @return
	 */
	@JsTopic("Chatters")
	public Collection<String> unregister(String chatter) {
		if (chatters.contains(chatter)) {
			chatters.remove(chatter);
		}
		return chatters;
	}
	
	/**
	 * Post message and broadcast to all ChatRoom topic subscribers 
	 * @param message
	 * @return
	 * @throws MessageInconsistentException 
	 */		  
	@JsTopic("ChatRoom")
	public Message postMessage(Message message) throws MessageInconsistentException {
		if (Objects.isNull(message) || Objects.isNull(message.getChatter()) || Objects.isNull(message.getText()) || message.getChatter().isEmpty() || message.getText().isEmpty()) {
			throw new MessageInconsistentException();
		}
		return message;
	}
}
