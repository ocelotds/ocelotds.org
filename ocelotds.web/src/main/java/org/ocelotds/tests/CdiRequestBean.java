/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
package org.ocelotds.tests;

import java.math.BigDecimal;
import org.ocelotds.Constants;
import org.ocelotds.annotations.DataService;
import org.ocelotds.annotations.JsCacheRemove;
import org.ocelotds.annotations.JsCacheRemoveAll;
import org.ocelotds.annotations.JsCacheResult;
import org.ocelotds.annotations.JsTopic;
import org.ocelotds.annotations.JsTopicControl;
import org.ocelotds.annotations.JsTopicName;
import org.ocelotds.messaging.MessageEvent;
import org.ocelotds.messaging.MessageToClient;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import javax.enterprise.event.Event;
import javax.enterprise.inject.Any;
import javax.enterprise.inject.Instance;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.AssertFalse;
import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Future;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import org.ocelotds.context.OcelotContext;
import org.ocelotds.security.JsTopicAccessController;
import org.ocelotds.security.JsTopicCtrlAnnotationLiteral;

/**
 *
 * @author hhfrancois
 */
@DataService(resolver = Constants.Resolver.CDI)
public class CdiRequestBean {

	@Inject
	private Principal principal;

	private final Random random = new Random();

	@Inject
	private GlobalTopicAC globalTopicAC;

	@Inject
	private OcelotContext ctx;

	@Inject
	@Any
	Instance<JsTopicAccessController> myTopicAccessControllers;
	
	JsTopicAccessController getJsTopicAccessController() {
		return myTopicAccessControllers.select(new JsTopicCtrlAnnotationLiteral("mytopic")).get();
	}

	public String getCDIPrincipalName() {
		return principal.getName();
	}

	public void setGlobalTopicAccess(boolean b) {
		globalTopicAC.setAccess(b);
	}

	public void setSpecificTopicAccess(boolean b) {
		((SpecificTopicAC) getJsTopicAccessController()).setAccess(b);
	}

	public void getVoid() {
	}

	public String getString() {
		return "FOO";
	}

	public int getNum() {
		return 1;
	}

	public Integer getNumber() {
		return 2;
	}

	public boolean getBool() {
		return Boolean.TRUE;
	}

	public Boolean getBoolean() {
		return Boolean.FALSE;
	}

	public Date getDate() {
		return new Date();
	}

	public Result getResult() {
		return Result.getMock();
	}

	public Collection<Integer> getCollectionInteger() {
		Collection<Integer> result = new ArrayList<>();
		result.add(1);
		result.add(2);
		result.add(3);
		result.add(4);
		return result;
	}

	public Collection<Result> getCollectionResult() {
		Collection<Result> result = new ArrayList<>();
		result.add(Result.getMock());
		result.add(Result.getMock());
		result.add(Result.getMock());
		result.add(Result.getMock());
		return result;
	}

	public Collection<Collection<Result>> getCollectionOfCollectionResult() {
		Collection<Collection<Result>> result = new ArrayList<>();
		result.add(getCollectionResult());
		result.add(getCollectionResult());
		result.add(getCollectionResult());
		result.add(getCollectionResult());
		return result;
	}

	public Map<String, Result> getMapResult() {
		Map<String, Result> result = new HashMap<>();
		result.put("1", Result.getMock());
		result.put("2", Result.getMock());
		result.put("3", Result.getMock());
		result.put("4", Result.getMock());
		return result;
	}

	public String methodWithNum(int i) {
		return "methodWithNum_" + i;
	}

	public String methodWithNumber(Integer i) {
		return "methodWithNumber_" + i;
	}

	public String methodWithBool(boolean i) {
		return "methodWithBool_" + i;
	}

	public String methodWithBoolean(Boolean i) {
		return "methodWithBoolean_" + i;
	}

	public String methodWithDate(Date i) {
		return "methodWithDate_" + ((i != null) ? i.getTime() : null);
	}

	public String methodWithResult(Result i) {
		return "methodWithResult_" + ((i != null) ? i.getInteger() : null);
	}

	public String methodWithArrayInteger(Integer[] i) {
		return "methodWithArrayInteger_" + ((i != null) ? i.length : null);
	}

	public String methodWithCollectionInteger(Collection<Integer> i) {
		return "methodWithCollectionInteger_" + ((i != null) ? i.size() : null);
	}

	public String methodWithArrayResult(Result[] i) {
		return "methodWithArrayResult_" + ((i != null) ? i.length : null);
	}

	public String methodWithCollectionResult(Collection<Result> i) {
		return "methodWithCollectionResult_" + ((i != null) ? i.size() : null);
	}

	public String methodWithMapResult(Map<String, Result> i) {
		return "methodWithMapResult_" + ((i != null) ? i.size() : null);
	}

	public String methodWithCollectionOfCollectionResult(Collection<Collection<Result>> i) {
		return "methodWithCollectionOfCollectionResult_" + ((i != null) ? i.size() : null);
	}

	public String methodWithManyParameters(String a, int b, Result c, Collection<String> d) {
		return "methodWithManyParameters a=" + a + " - b=" + b + " - c=" + ((c != null) ? c.getInteger() : null) + " - d:" + ((d != null) ? d.size() : null);
	}

	public void methodThatThrowException() throws MethodException {
		throw new MethodException("message of exception");
	}

	public String methodWithAlmostSameSignature(Integer i) {
		return "Integer";
	}

	public String methodWithAlmostSameSignature(String i) {
		return "String";
	}

	public String methodWithAlmostSameSignature(String i, String s) {
		return "String2";
	}

	@Inject
	@MessageEvent
	Event<MessageToClient> wsEvent;

	public void publish(String topic, int nb) {
		for (int i = 1; i <= nb; i++) {
			MessageToClient messageToClient = new MessageToClient();
			messageToClient.setId(topic);
			messageToClient.setResponse("Message From server " + i);
			wsEvent.fire(messageToClient);
		}
	}

	@JsCacheResult(minute = 1)
	public Collection<Integer> methodCached() {
		Collection<Integer> result = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			result.add(random.nextInt(100));
		}
		return result;
	}

	@JsCacheRemove(cls = CdiRequestBean.class, methodName = "methodCached")
	public void methodRemoveCache() {
	}

	@JsCacheRemoveAll
	public void methodRemoveAllCache() {
	}

	@JsTopic(value = "GlobalTopic")
	public String sendToGlobalTopic(String message) {
		return message;
	}

	@JsTopic
	public String sendToSpecificTopic(String message, @JsTopicName String topic) {
		return message;
	}

	public boolean isUserInRole(String role) {
		return ctx.isUserInRole(role);
	}

	public void methodWithValidationArguments(@NotNull String str0, @NotNull String str1, @NotNull String str2) {}
	
	public void methodWithArgumentNotNull(@NotNull String str0) {}

	public void methodWithArgumentNull(@Null String str0) {}

	public void methodWithArgumentMax(@Max(10) int int0) {}

	public void methodWithArgumentMin(@Min(10) int int0) {}

	public void methodWithArgumentFuture(@Future Date date0) {}

	public void methodWithArgumentPast(@Past Date date0) {}

	public void methodWithArgumentFalse(@AssertFalse Boolean bool0) {}

	public void methodWithArgumentTrue(@AssertTrue Boolean bool0) {}

	public void methodWithArgumentDecimalMax(@DecimalMax("50") long lg0) {}

	public void methodWithArgumentDecimalMin(@DecimalMin("50") long lg0) {}

	public void methodWithArgumentDigits3_2(@Digits(integer = 3, fraction = 2) BigDecimal bd0) {}

	public void methodWithArgumentSize2_10(@Size(min = 2, max = 10) String str0) {}

	public void methodWithArgumentPattern(@Pattern(regexp = "\\d*") String str0) {}
	
	public void methodWithArgumentConstraint(@Valid WithConstraint wc) {}

	public String methodWithArgumentgetDs(String getDs) {
		return getDs;
	}
}
