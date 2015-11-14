FROM java:openjdk-8-jdk

MAINTAINER Francois Achache <francois.achache@gmail.com>

ENV OCELOT_VERSION 2.4.6-SNAPSHOT
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH $PATH:$JAVA_HOME/bin
ENV MAVEN_VERSION 3.3.3
ENV POM_XML wildfly.xml

############### BEGIN COMMON PART ###############
# Get maven
RUN curl -fsSL http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz | tar xzf - -C /usr/share \
  && mv /usr/share/apache-maven-$MAVEN_VERSION /usr/share/maven \
  && ln -s /usr/share/maven/bin/mvn /usr/bin/mvn
# Build ocelot
RUN curl --silent --location --retry 3 https://github.com/hhdevelopment/ocelot/archive/master.tar.gz | tar xz -C /tmp \
  && cd /tmp/ocelot-master && mvn install -Dgpg.skip=true -DskipTests=true

# Build ocelotds
RUN curl --silent --location --retry 3 https://github.com/hhdevelopment/ocelotds.org/archive/master.tar.gz | tar xz -C /tmp \
  && cd /tmp/ocelotds.org-master && mvn package -f $POM_XML && mv /tmp/ocelotds.org-master/target/ocelotds*.war /tmp/

# Clean
RUN rm -rf /tmp/ocelot-master && rm -rf /tmp/ocelotds.org-master && rm -f /usr/bin/mvn && rm -rf /usr/share/maven && rm -rf ~/.m2
############### END COMMON PART ###############

# Set the WILDFLY env variable
ENV WILDFLY_VERSION 9.0.2.Final
ENV WILDFLY_HOME /usr/local/wildfly-$WILDFLY_VERSION
ENV PATH $PATH:$WILDFLY_HOME/bin


# Install wildfly
RUN curl -O https://download.jboss.org/wildfly/$WILDFLY_VERSION/wildfly-$WILDFLY_VERSION.tar.gz \
    && tar xf wildfly-$WILDFLY_VERSION.tar.gz -C /usr/local \
    && rm wildfly-$WILDFLY_VERSION.tar.gz

# Define demo user
RUN $WILDFLY_HOME/bin/add-user.sh -a demo demo \
  && echo "demo=USERGP" >> $WILDFLY_HOME/domain/configuration/application-roles.properties

# Deploy ocelotds
RUN mv /tmp/ocelot*.war $WILDFLY_HOME/standalone/deployments

# Expose the ports we're interested in
EXPOSE 8080 9090

WORKDIR $WILDFLY_HOME

# Set the default command to run on boot
# This will boot WildFly in the standalone mode and bind to all interface
CMD ["standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
