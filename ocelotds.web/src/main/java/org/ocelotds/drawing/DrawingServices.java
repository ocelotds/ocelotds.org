/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.drawing;

import javax.inject.Inject;
import javax.websocket.Session;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import org.ocelotds.annotations.JsTopic;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.CDI)
public class DrawingServices {

	@Inject
	Session session;
	
	@JsTopic("eventCanvas")
	public CanvasEvent pushCanvasEvent(CanvasEvent evt) {
		evt.setId(session.getId());
		return evt;
	}
}
