FROM java:openjdk-8-jdk

MAINTAINER Francois Achache <francois.achache@gmail.com>

ENV OCELOT_VERSION 2.4.6-SNAPSHOT
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV PATH $PATH:$JAVA_HOME/bin
ENV MAVEN_VERSION 3.3.3
ENV PROFILE tomcat

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
  && cd /tmp/ocelotds.org-master && mvn package -P $PROFILE && mv /tmp/ocelotds.org-master/target/ocelotds*.war /tmp/

# Clean
RUN rm -rf /tmp/ocelot-master && rm -rf /tmp/ocelotds.org-master && rm -f /usr/bin/mvn && rm -rf /usr/share/maven && rm -rf ~/.m2
############### END COMMON PART ###############

# Set the TOMCAT env variables
ENV TOMCAT_VERSION 8
ENV TOMCAT_RELEASE 8.0.24
ENV TOMCAT_HOME /usr/local/apache-tomcat-$TOMCAT_RELEASE
ENV PATH $PATH:$TOMCAT_HOME/bin

# Install tomcat
RUN curl -O http://www.webhostingreviewjam.com/mirror/apache/tomcat/tomcat-$TOMCAT_VERSION/v$TOMCAT_RELEASE/bin/apache-tomcat-$TOMCAT_RELEASE.tar.gz \
    && tar xf apache-tomcat-$TOMCAT_RELEASE.tar.gz -C /usr/local \
    && rm apache-tomcat-$TOMCAT_RELEASE.tar.gz

# Define demo user

# Deploy ocelotds
RUN mv /tmp/ocelot*.war $TOMCAT_HOME/webapps

# Expose the ports we're interested in
EXPOSE 8080

# Expose workspace
WORKDIR $TOMCAT_HOME

# start tomcat
CMD 

